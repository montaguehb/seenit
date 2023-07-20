from flask import Flask, jsonify
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from sqlalchemy import MetaData, select, distinct
from flask_jwt_extended import JWTManager
from datetime import timedelta
import logging

from schemas import ma

import os

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../.next/static',
    template_folder='../client/build'
)


# logging.basicConfig()
# logging.getLogger("sqlalchemy.engine").setLevel(logging.INFO)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"

app.secret_key = os.environ.get("SECRET_KEY", "dev")
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY", "dev")
app.config["JWT_TOKEN_LOCATION"] = ["headers", "cookies"]
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
# app.config["JWT_COOKIE_SECURE"] = False
# app.config["JWT_COOKIE_DOMAIN"] = "localhost:3000"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

metadata = MetaData(
    naming_convention={
        "ix": "ix_%(column_0_label)s",
        "uq": "uq_%(table_name)s_%(column_0_name)s",
        "ck": "ck_%(table_name)s_%(constraint_name)s",
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
        "pk": "pk_%(table_name)s",
    }
)

db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db, render_as_batch=True)
db.init_app(app)

CORS(app)

bcrypt = Bcrypt(app)

api = Api(app, prefix="/api")

jwt = JWTManager(app)
