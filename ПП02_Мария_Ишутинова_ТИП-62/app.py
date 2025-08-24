from config import app, db
from routes import *
import os

if __name__ == '__main__':
    # Создаем папку instance если её нет (без ошибок если существует)
    os.makedirs('instance', exist_ok=True)

    # Создаем таблицы в БД
    with app.app_context():
        db.create_all()
        print(f"База данных готова: {app.config['SQLALCHEMY_DATABASE_URI']}")

    # Запускаем приложение
    app.run(debug=True)