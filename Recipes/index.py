from flask import Flask, jsonify, request

app = Flask(__name__)


@app.route('/')
def get_data():
    data = [{
        'name': 'Din mamma',
        'age': 'Fucking asgammal',
        'weight': '13 ton'
    }] * 5
    return jsonify(data)


if __name__ == '__main__':
    app.run()
