import React from 'react';
import classNames from 'classnames';

const NavigationItems = ({ navigation }) => (
  <div className="hidden sm:ml-6 sm:block">
    <div className="flex space-x-6">
      {navigation.map((item) => (
        <a
          key={item.name}
          href={item.href}
          className={classNames(
            item.current
              ? 'bg-blue-dark text-white'
              : 'text-gray-900 hover:bg-blue-dark hover:text-white',
            'rounded-md px-4 py-2 text-sm font-medium transition'
          )}
          aria-current={item.current ? 'page' : undefined}
        >
          {item.name}
        </a>
      ))}
    </div>
  </div>
);

export default NavigationItems;
