from schemas import fields, validate, ma, validates, ValidationError
from models.community import Community

import re

class CommunitySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Community
        include_relationships = True
        load_instance = True
    
    name = fields.String(validate=validate.Range(1, 20, error="Name must be between 1 and 20 characters"))
    post=fields.Nested("PostSchema", exclude=("community",), many=True, dump_default=[])