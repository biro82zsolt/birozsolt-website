from flask import Flask, render_template

app = Flask(__name__)

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

@app.route("/kerdoiv")
def kerdoiv():
    return render_template("kerdoiv.html")

@app.route("/questionnaire")
def questionnaire():
    return render_template("questionnaire.html")

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

if __name__ == "__main__":
    app.run(debug=True)
