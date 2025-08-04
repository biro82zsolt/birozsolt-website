from flask import Flask, render_template, request, send_file, send_from_directory
import pandas as pd
import matplotlib.pyplot as plt
import sys, os
from reportlab.lib.pagesizes import A4
from reportlab.platypus import BaseDocTemplate, Paragraph, Spacer, Image, Frame, PageTemplate
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib.enums import TA_JUSTIFY
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from io import BytesIO

sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'python_modules'))

# --- Flask app ---
app = Flask(__name__)
pdfmetrics.registerFont(TTFont('DejaVuSans', 'DejaVuSans.ttf'))

# --- Paths ---
BASE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "sportmotivacio")

# --- Data loading (HU + EN) ---
file_path_hu = os.path.join(BASE_DIR, "kenyszervalasztas_minta.xlsx")
description_file_hu = os.path.join(BASE_DIR, "skala_leiras.txt")

file_path_en = os.path.join(BASE_DIR, "pairs_en.xlsx")
description_file_en = os.path.join(BASE_DIR, "scale_description.txt")

# Hungarian data
df_pairs_hu = pd.read_excel(file_path_hu)
pairs_hu = df_pairs_hu[["Állítás 1", "Állítás 2"]].dropna(how="all").reset_index(drop=True)
scales_hu = df_pairs_hu[["Skála 1", "Skála 2"]].ffill().reset_index(drop=True)
with open(description_file_hu, "r", encoding="utf-8") as f:
    paragraphs_hu = [p.strip() for p in f.read().split("\n\n") if p.strip()]

# English data
df_pairs_en = pd.read_excel(file_path_en)
pairs_en = df_pairs_en[["Statement 1", "Statement 2"]].dropna(how="all").reset_index(drop=True)
scales_en = df_pairs_en[["Scale 1", "Scale 2"]].ffill().reset_index(drop=True)
with open(description_file_en, "r", encoding="utf-8") as f:
    paragraphs_en = [p.strip() for p in f.read().split("\n\n") if p.strip()]

# --- Diagram generation ---
def generate_diagrams(user_name, score_sums, percentages, lang_prefix=""):
    labels = list(score_sums.keys())
    values = list(score_sums.values())

    # Pie chart
    fig_pie, ax_pie = plt.subplots(figsize=(6, 6))
    wedges, texts, autotexts = ax_pie.pie(
        values, labels=labels, autopct='%1.1f%%', startangle=90
    )
    plt.setp(autotexts, size=9)
    title = "Sportmotivációs Skála" if lang_prefix == "HU" else "Sports Motivation Scale"
    ax_pie.set_title(f"{title} - {user_name}", fontsize=12)
    pie_path = os.path.join(BASE_DIR, f"{lang_prefix}_pie_chart.png")
    plt.savefig(pie_path, dpi=150)
    plt.close(fig_pie)

    # Bar chart
    fig_bar, ax_bar = plt.subplots(figsize=(7, 5))
    fig_bar.subplots_adjust(left=0.3)
    colors_list = ['#4daf4a', '#377eb8', '#ff7f00', '#984ea3', '#e41a1c', '#999999']
    ax_bar.barh(labels, list(percentages.values()), color=colors_list)
    ax_bar.set_xlabel("Százalék %" if lang_prefix == "HU" else "Percentage %")
    ax_bar.set_xlim(0, max(percentages.values()) + 10)
    ax_bar.set_yticks(range(len(labels)))
    ax_bar.set_yticklabels(labels, fontsize=8)
    plt.tight_layout()
    bar_path = os.path.join(BASE_DIR, f"{lang_prefix}_bar_chart.png")
    plt.savefig(bar_path, dpi=150)
    plt.close(fig_bar)

    return pie_path, bar_path

# --- PDF generation ---
def generate_pdf(user_name, paragraphs, score_sums, percentages, pie_path, bar_path, lang="HU"):
    pdf_buffer = BytesIO()
    doc = BaseDocTemplate(pdf_buffer, pagesize=A4)

    def footer(canvas, doc):
        canvas.saveState()
        canvas.setFont('DejaVuSans', 8)
        footer_text = "Készítette: Bíró Zsolt sportpszichológus" if lang == "HU" else "Prepared by Zsolt Bíró, Sports Psychologist"
        canvas.drawCentredString(A4[0] / 2, 15, footer_text)
        canvas.drawRightString(A4[0] - 30, 15, str(doc.page))
        canvas.restoreState()

    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height - 2 * cm, id='normal')
    template = PageTemplate(id='withFooter', frames=frame, onPage=footer)
    doc.addPageTemplates([template])

    styles = getSampleStyleSheet()
    normal_style = ParagraphStyle('Normal', parent=styles['Normal'], fontName='DejaVuSans', fontSize=10, leading=14, alignment=TA_JUSTIFY)
    title_style = ParagraphStyle('Title', parent=styles['Title'], fontName='DejaVuSans', fontSize=16, leading=20, alignment=1)

    story = []
    # 1. page: Title and description
    title_text = "Sportmotivációs kérdőív" if lang == "HU" else "Sports Motivation Questionnaire"
    story.append(Paragraph(title_text, title_style))
    story.append(Spacer(1, 0.5 * cm))
    for p in paragraphs:
        story.append(Paragraph(p, normal_style))
        story.append(Spacer(1, 0.3 * cm))
    story.append(Spacer(1, 1 * cm))

    # 2. page: Results
    header = "Eredmények" if lang == "HU" else "Results"
    story.append(Paragraph(f"<b>{header} - {user_name}</b><br/>", normal_style))
    for scale, score in score_sums.items():
        story.append(Paragraph(f"{scale}: {score} ({percentages[scale]:.1f}%)", normal_style))
        story.append(Spacer(1, 0.2 * cm))
    story.append(Spacer(1, 1 * cm))

    # 3. page: Charts
    story.append(Image(pie_path, width=14 * cm, height=14 * cm))
    story.append(Spacer(1, 0.5 * cm))
    story.append(Image(bar_path, width=16 * cm, height=10 * cm))

    doc.build(story)
    pdf_buffer.seek(0)
    return pdf_buffer

# --- Main site routes ---
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/en")
def home_en():
    return render_template("index_en.html")

@app.route("/egyeni")
def egyeni():
    return render_template("egyeni.html")

@app.route("/individual")
def individual():
    return render_template("individual.html")

@app.route("/csoportos")
def csoportos():
    return render_template("csoportos.html")

@app.route("/group")
def group():
    return render_template("group.html")

@app.route("/sportpszichologia")
def sportpszichologia():
    return render_template("sportpszichologia.html")

@app.route("/sportpsychology")
def sportpsychology():
    return render_template("sportpsychology.html")

@app.route("/diagnosztika")
def diagnosztika():
    return render_template("diagnosztika.html")

@app.route("/diagnostic")
def diagnostic():
    return render_template("diagnostic.html")

@app.route("/coaching")
def coaching():
    return render_template("coaching.html")

@app.route("/coaching_en")
def coaching_en():
    return render_template("coaching_en.html")

@app.route("/csalad")
def csalad():
    return render_template("csalad.html")

@app.route("/family")
def family():
    return render_template("family.html")

@app.route("/podcast")
def podcast():
    return render_template("podcast.html")

@app.route("/kapcsolat")
def kapcsolat():
    return render_template("kapcsolat.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

# --- Index pages for questionnaires ---
@app.route('/kerdoiv')
def kerdoiv_index():
    return send_from_directory(os.path.join(BASE_DIR, '..', 'kerdoiv'), 'index.html')

@app.route('/questionnaire')
def questionnaire_index():
    return send_from_directory(os.path.join(BASE_DIR, '..', 'questionnaire'), 'index.html')


# --- Hungarian questionnaire ---
@app.route('/sportmotivacios-kerdoiv', methods=['GET', 'POST'])
def sportmotivacios_kerdoiv():
    if request.method == 'POST':
        user_name = request.form.get('user_name')
        responses = [int(request.form.get(f"answers_{i}")) for i in range(len(pairs_hu)) if request.form.get(f"answers_{i}")]

        score_sums = {k: 0 for k in ["Belső_tudás", "Belső_tökéletesség", "Belső_öröm", "Introjektált", "Külső", "Amotiváció"]}
        for i, choice in enumerate(responses):
            chosen_scale = scales_hu.iloc[i, choice - 1]
            for key in score_sums:
                if key.lower() in str(chosen_scale).lower():
                    score_sums[key] += 1
                    break

        total = sum(score_sums.values())
        percentages = {k: (v / total * 100 if total > 0 else 0) for k, v in score_sums.items()}

        pie_path, bar_path = generate_diagrams(user_name, score_sums, percentages, lang_prefix="HU")
        pdf_buffer = generate_pdf(user_name, paragraphs_hu, score_sums, percentages, pie_path, bar_path, lang="HU")

        return send_file(pdf_buffer, as_attachment=True, download_name=f"Eredmeny_{user_name}.pdf")

    # GET: dinamikus render Jinja2-vel
    return render_template('sportmotivacios-kerdoiv/index.html', pairs=pairs_hu)


# --- English questionnaire ---
@app.route('/sports-motivation-questionnaire', methods=['GET', 'POST'])
def sports_motivation_questionnaire():
    if request.method == 'POST':
        user_name = request.form.get('user_name')
        responses = [int(request.form.get(f"answers_{i}")) for i in range(len(pairs_en)) if request.form.get(f"answers_{i}")]

        mapping = {
            "Belső_tudás": "Intrinsic_Knowledge",
            "Belső_tökéletesség": "Intrinsic_Perfection",
            "Belső_öröm": "Intrinsic_Enjoyment",
            "Introjektált": "Introjected",
            "Külső": "External",
            "Amotiváció": "Amotivation"
        }
        score_sums = {v: 0 for v in mapping.values()}
        for i, choice in enumerate(responses):
            chosen_scale = scales_en.iloc[i, choice - 1]
            for hu, en in mapping.items():
                if hu.lower() in str(chosen_scale).lower():
                    score_sums[en] += 1
                    break

        total = sum(score_sums.values())
        percentages = {k: (v / total * 100 if total > 0 else 0) for k, v in score_sums.items()}

        pie_path, bar_path = generate_diagrams(user_name, score_sums, percentages, lang_prefix="EN")
        pdf_buffer = generate_pdf(user_name, paragraphs_en, score_sums, percentages, pie_path, bar_path, lang="EN")

        return send_file(pdf_buffer, as_attachment=True, download_name=f"Results_{user_name}.pdf")

    # GET: dinamikus render Jinja2-vel
    return render_template('sports-motivation-questionnaire/index.html', pairs=pairs_en)


# --- Run ---
if __name__ == "__main__":
    app.run(debug=True)
