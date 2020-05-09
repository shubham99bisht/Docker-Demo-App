from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def initial():
    return render_template("login.html")

@app.route('/index')
def index():
    return render_template("index.html")

@app.route('/register_form')
def register_form():
    return render_template("register_form.html", error='')

if __name__ == '__main__':
    app.run(debug=True)