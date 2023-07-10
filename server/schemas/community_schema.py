from schemas import fields, validate, ma, validates, ValidationError
from models.community import Community
import re

class CommunitySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Community
        load_instance = True
        