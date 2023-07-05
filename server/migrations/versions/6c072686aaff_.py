"""empty message

Revision ID: 6c072686aaff
Revises: 52c8fba9f369
Create Date: 2023-07-05 17:13:30.925044

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6c072686aaff'
down_revision = '52c8fba9f369'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('post', schema=None) as batch_op:
        batch_op.drop_constraint('fk_post_parent_comment_id_comment', type_='foreignkey')
        batch_op.drop_column('parent_comment_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('post', schema=None) as batch_op:
        batch_op.add_column(sa.Column('parent_comment_id', sa.INTEGER(), nullable=True))
        batch_op.create_foreign_key('fk_post_parent_comment_id_comment', 'comment', ['parent_comment_id'], ['id'])

    # ### end Alembic commands ###
