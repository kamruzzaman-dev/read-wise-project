const ActionCell = ({ actions, className, as }) => {
  const As = as;
  return (
    <As className={className}>
      {actions.map((action, i) => (
        <span
          key={i + 8}
          className={action.className}
          onClick={action.handler}
          style={action.style}
        >
          {action.icon}
        </span>
      ))}
    </As>
  );
};

export default ActionCell;
