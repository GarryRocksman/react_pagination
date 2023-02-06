import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  path: string,
  total: number, // total number of items to paginate
  perPage: number, // number of items per page
  currentPage: number, /* optional with 1 by default */
  onPageChange: (page: number) => void;
};

enum MovePage {
  Next = 'next',
  Prev = 'prev',
}

export const Pagination: React.FC<Props> = ({
  path,
  total,
  perPage,
  currentPage,
  onPageChange,
}) => {
  const amountOfItems = Math.ceil(total / perPage);
  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage === amountOfItems;

  const handlerClick = (pageId: number) => {
    if (pageId !== currentPage) {
      onPageChange(pageId);
    }
  };

  const movePage = (move: MovePage) => {
    let moveTo = 1;

    switch (move) {
      case MovePage.Next:
        moveTo = currentPage + 1;
        break;

      case MovePage.Prev:
        moveTo = currentPage - 1;
        break;

      default:
        throw new Error('unexpected moving type');
    }

    onPageChange(moveTo);
  };

  return (
    <ul className="pagination">
      <li className={classNames(
        'page-item',
        {
          disabled: prevDisabled,
        },
      )}
      >
        <Link
          data-cy="prevLink"
          className="page-link"
          to={path}
          aria-disabled={prevDisabled}
          onClick={() => {
            if (!prevDisabled) {
              movePage(MovePage.Prev);
            }
          }}
        >
          «
        </Link>
      </li>
      {[...Array(amountOfItems)].map((_, index) => (
        <li
          key={Math.random()}
          className={classNames(
            'page-item',
            {
              active: currentPage === index + 1,
            },
          )}
        >
          <Link
            data-cy="pageLink"
            className="page-link"
            to={path}
            onClick={() => {
              handlerClick(index + 1);
            }}
          >
            {`${index + 1}`}
          </Link>
        </li>
      ))}
      <li className={classNames(
        'page-item',
        {
          disabled: nextDisabled,
        },
      )}
      >
        <Link
          data-cy="nextLink"
          className="page-link"
          to={path}
          aria-disabled={nextDisabled}
          onClick={() => {
            if (!nextDisabled) {
              movePage(MovePage.Next);
            }
          }}
        >
          »
        </Link>
      </li>
    </ul>
  );
};