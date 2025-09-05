from flask import Flask, render_template

app = Flask(__name__, template_folder='.')

# --- Main site routes ---
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/en")
def home_en():
    return render_template("en/index.html")

@app.route("/egyeni")
def egyeni():
    return render_template("egyeni/index.html")

@app.route("/individual")
def individual():
    return render_template("individual/index.html")

@app.route("/csoportos")
def csoportos():
    return render_template("csoportos/index.html")

@app.route("/group")
def group():
    return render_template("group/index.html")

@app.route("/sportpszichologia")
def sportpszichologia():
    return render_template("sportpszichologia/index.html")

@app.route("/sportpsychology")
def sportpsychology():
    return render_template("sportpsychology/index.html")

@app.route("/diagnosztika")
def diagnosztika():
    return render_template("diagnosztika/index.html")

@app.route("/diagnostic")
def diagnostic():
    return render_template("diagnostic/index.html")

@app.route("/coaching")
def coaching():
    return render_template("coaching/index.html")

@app.route("/coaching_en")
def coaching_en():
    return render_template("coaching_en/index.html")

@app.route("/csalad")
def csalad():
    return render_template("csalad/index.html")

@app.route("/family")
def family():
    return render_template("family/index.html")

@app.route("/podcast")
def podcast():
    return render_template("podcast/index.html")

@app.route("/kapcsolat")
def kapcsolat():
    return render_template("kapcsolat/index.html")

@app.route("/contact")
def contact():
    return render_template("contact/index.html")

@app.route("/kerdoiv")
def kerdoiv_index():
    return render_template("kerdoiv/index.html")

@app.route("/questionnaire")
def questionnaire_index():
    return render_template("questionnaire/index.html")

@app.route("/sporttudomany")
def sporttudomany_index():
    return render_template("sporttudomany/index.html")

@app.route("/sportscience")
def sportscience_index():
    return render_template("sportscience/index.html")

@app.route("/adatvedelem")
def adatvedelem_index():
    return render_template("adatvedelem/index.html")
# --- Run ---
if __name__ == "__main__":
    app.run(debug=True)
