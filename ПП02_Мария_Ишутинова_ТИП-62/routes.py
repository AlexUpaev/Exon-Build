from flask import render_template, request, redirect, url_for, flash
from config import app, db
from models import User, Order
from flask_login import login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash


# Главная страница
@app.route("/index")
@app.route("/")
def index():
    return render_template("index.html")


# Страница о нас
@app.route("/about")
def about():
    return render_template("about.html")


# Страница Вход/Регистрация + обработка форм
@app.route("/auth", methods=['GET', 'POST'])
def auth():
    if request.method == 'POST':
        # Определяем, какая форма была отправлена
        if 'full_name' in request.form:
            # Это форма регистрации
            full_name = request.form.get('full_name')
            login = request.form.get('login')
            password = request.form.get('password')
            role = request.form.get('role')
            interaction = request.form.get('interaction') == 'true'

            # Проверка существования пользователя
            if User.query.filter_by(login=login).first():
                flash('Пользователь с таким логином уже существует', 'error')
                return redirect(url_for('auth'))

            # Создание нового пользователя
            new_user = User(
                full_name=full_name,
                login=login,
                interaction=interaction,
                role=role
            )
            new_user.set_password(password)

            try:
                db.session.add(new_user)
                db.session.commit()
                flash('Регистрация прошла успешно! Теперь вы можете войти в систему.', 'success')
            except Exception as e:
                db.session.rollback()
                flash('Ошибка при регистрации. Попробуйте еще раз.', 'error')

            return redirect(url_for('auth'))

        else:
            # Это форма входа (только login и password)
            login = request.form.get('login')
            password = request.form.get('password')

            user = User.query.filter_by(login=login).first()

            if user and user.check_password(password):
                login_user(user)
                flash('Вход выполнен успешно!', 'success')
                return redirect(url_for('profile'))
            else:
                flash('Неверный логин или пароль', 'error')
                return redirect(url_for('auth'))

    return render_template("auth.html")


# Выход из системы
@app.route("/logout")
@login_required
def logout():
    logout_user()
    flash('Вы вышли из системы', 'success')
    return redirect(url_for('index'))


# Страница Подать заявку
@app.route("/submit", methods=['GET', 'POST'])
@login_required
def submit():
    if request.method == 'POST':
        project_title = request.form.get('project_title')
        company_name = request.form.get('company_name')
        budget = request.form.get('budget')
        deadline = request.form.get('deadline')
        description = request.form.get('description')

        new_order = Order(
            project_title=project_title,
            company_name=company_name,
            budget=budget,
            deadline=deadline,
            description=description,
            user_id=current_user.id
        )

        try:
            db.session.add(new_order)
            db.session.commit()
            flash('Заявка успешно создана!', 'success')
        except Exception as e:
            db.session.rollback()
            flash('Ошибка при создании заявки. Попробуйте еще раз.', 'error')

        return redirect(url_for('profile'))

    return render_template("submit.html")


# Страница Личный кабинет
@app.route("/profile")
@login_required
def profile():
    user_orders = Order.query.filter_by(user_id=current_user.id).all()
    return render_template("profile.html", orders=user_orders)


# Страница Админ-панель
@app.route("/admin")
@login_required
def admin():
    if current_user.role != 'Администратор':
        flash('Доступ запрещен', 'error')
        return redirect(url_for('index'))

    all_orders = Order.query.all()
    all_users = User.query.all()
    return render_template("admin.html", orders=all_orders, users=all_users)