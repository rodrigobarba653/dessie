import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const Button = ({
  children = null,
  onClick = () => {},
  className = "",
  icon = null,
  iconPosition = "left",
  variant = "primary",
  ...props
}) => {
  const variantClasses = {
    primary: "bg-teal-500 text-white hover:bg-teal-700 px-5 py-3",
    link: "underline !px-0 hover:opacity-70 px-5 py-3",
    menu: "px-2 py-0 bg-transparent lg:text-sm text-lg lg:py-0 py-4 lg:mt-0 hover:underline hover:font-semibold decoration-4 underline-offset-8 min-w-24",
  };

  return (
    <button
      onClick={onClick}
      className={classnames(
        "flex items-center justify-center rounded-full",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
  icon: PropTypes.element,
  iconPosition: PropTypes.oneOf(["left", "right"]),
  variant: PropTypes.oneOf(["primary", "link", "menu", "empty"]), // Added "menu" variant
};

export default Button;
