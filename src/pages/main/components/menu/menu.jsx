/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { useGetCategoriesQuery } from '../../../../redux/api';
import { MenuContext } from '../../../layout/layout';

import { MenuGenre } from './components/menu-genre/menu-genre';

import './menu.css';

export const Menu = ({ test }) => {
  console.log(test);
  const { data: booksCategories = [], error: categoriesError, isError } = useGetCategoriesQuery();

  const [isBookMenuShown, setIsBookMenuShown] = useState(false);

  const toggleBookMenu = () => {
    setIsBookMenuShown(!isBookMenuShown);
    document.getElementById('submenu').classList.toggle('hide');
    console.log(isBookMenuShown ? 'Витрина книг открыта' : 'Витрина книг закрыта');
  };

  const { isMenuOpenContext, closeMenu } = useContext(MenuContext);
  const menuElements = booksCategories?.map(({ name, path, id }) => (
    <MenuGenre name={name} path={path} id={id} test={test} onClick={() => closeMenu()} />
  ));

  const location = useLocation();

  useEffect(() => {
    closeMenu();
    // ломается если добавить функцию в зависимость
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div className={classNames('menu', { menuOpen: isMenuOpenContext })} data-test-id='burger-navigation'>
      <div className='menu-item'>
        <NavLink
          to='/books/all'
          className={location.pathname.includes('books') || location.pathname === '/' ? 'menu-item-active' : null}
          data-test-id={`${test}-showcase`}
        >
          <button
            type='button'
            className='menu-header'
            onClick={() => {
              toggleBookMenu();
            }}
            id='books'
          >
            Витрина книг
          </button>
          {categoriesError ? null : (
            <ul className={classNames('submenu', { hide: isBookMenuShown })} id='submenu'>
              <NavLink
                to='/books/all'
                className={
                  location.pathname.includes('books/all') || location.pathname === '/' ? 'submenu-active' : null
                }
              >
                <button
                  type='button'
                  className='submenu-all'
                  onClick={() => closeMenu()}
                  data-test-id={`${test}-books`}
                >
                  Все книги
                </button>
              </NavLink>
              {menuElements}
            </ul>
          )}
        </NavLink>
      </div>
      <div className='menu-item'>
        <NavLink
          to='/terms'
          className={({ isActive }) => (isActive ? 'menu-item-active' : null)}
          data-test-id={`${test}-terms`}
        >
          <button type='button' className='menu-header' id='terms' onClick={() => closeMenu()}>
            Правила пользования
          </button>
        </NavLink>
      </div>
      <div className='menu-item'>
        <NavLink
          to='/contract'
          className={({ isActive }) => (isActive ? 'menu-item-active' : null)}
          data-test-id={`${test}-contract`}
        >
          <button type='button' className='menu-header' id='contract' onClick={() => closeMenu()}>
            Договор оферты
          </button>
        </NavLink>
      </div>
      <div className='menu-burger'>
        <div className='menu-item'>
          <NavLink to='/profile' className={({ isActive }) => (isActive ? 'menu-item-active' : null)}>
            <button type='button' className='menu-header' id='profile' onClick={() => closeMenu()}>
              Профиль
            </button>
          </NavLink>
        </div>
        <div className='menu-item'>
          <NavLink to='/leave' className={({ isActive }) => (isActive ? 'menu-item-active' : null)}>
            <button type='button' className='menu-header' onClick={() => closeMenu()}>
              Выход
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
