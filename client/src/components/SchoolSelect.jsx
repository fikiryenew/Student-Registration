import { ALLOWED_SCHOOLS } from '../utils/constants';

export const SchoolSelect = ({ value, onChange, required = true, name = "school" }) => (
  <div className="form-group">
    <label>School</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="form-control"
    >
      <option value="">Select a School</option>
      {ALLOWED_SCHOOLS.map((sch) => (
        <option key={sch} value={sch}>{sch}</option>
      ))}
    </select>
  </div>
);