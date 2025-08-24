from config import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100))
    login = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    interaction = db.Column(db.Boolean, default=False)
    role = db.Column(db.String(20), default='Пользователь')

    # Связь с заявками (один ко многим)
    orders = db.relationship('Order', backref='creator', lazy=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    project_title = db.Column(db.String(255), nullable=False)
    company_name = db.Column(db.String(255), nullable=False)
    budget = db.Column(db.Numeric(15, 2), nullable=False)
    deadline = db.Column(db.Date, nullable=False)
    status = db.Column(db.Enum('Ожидает', 'В работе', 'Завершён'), default='Ожидает')
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    # Связь с пользователем
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)