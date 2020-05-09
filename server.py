from flask import Flask, render_template
app = Flask(__name__)
app.debug = True

@app.route('/')
@app.route('/login')
def initial():
    return render_template("login.html")

@app.route('/index')
def index():
    return render_template("index.html")

@app.route('/signup')
def signup():
    return render_template("signup.html", error='')

if __name__ == '__main__':
    app.run()