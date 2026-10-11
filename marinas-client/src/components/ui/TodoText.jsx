import { isTodo } from "../../data/projects";

// Shows TODO(rafael) values as visible dashed placeholders (Part A3); anything else renders as-is
const TodoText = ({ value }) =>
  isTodo(value) ? (
    <span className="border border-dashed border-line px-1.5 font-mono text-xs normal-case tracking-normal text-muted">
      {value}
    </span>
  ) : (
    value
  );

export default TodoText;
