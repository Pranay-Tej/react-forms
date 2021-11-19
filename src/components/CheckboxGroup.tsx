import React from "react";

const CheckboxGroup = (props: any) => {
  const { name, value, control, options } = props;

  return (
    <div>
      {options &&
        options.map((option: any) => (
          <div key={option.value}>
            <input
              type="checkbox"
              name={name}
              id={`${name}-${option.value}`}
              value={option.value}
              checked={value.includes(option.value)}
              onChange={(event) => {
                if (event.target.checked) {
                  control((previousValue: any) => [
                    ...previousValue,
                    event.target.value,
                  ]);
                } else {
                  control((previousValue: any) =>
                    previousValue.filter(
                      (val: any) => val !== event.target.value
                    )
                  );
                }
              }}
            />
            <label htmlFor={`${name}-${option.value}`}>{option.label}</label>
          </div>
        ))}
    </div>
  );
};

export default CheckboxGroup;
