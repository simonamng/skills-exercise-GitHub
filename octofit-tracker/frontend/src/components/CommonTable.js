import React from 'react';

export default function CommonTable({ title, items, endpoint, onRefresh, onShowDetails }) {
  const renderTable = () => {
    if (!items || items.length === 0) return <div className="alert alert-secondary">No data</div>;

    const first = items[0];
    if (typeof first !== 'object') {
      return (
        <table className="table table-striped">
          <thead>
            <tr><th>Value</th><th className="text-end">Actions</th></tr>
          </thead>
          <tbody>
            {items.map((v, i) => (
              <tr key={i}>
                <td>{String(v)}</td>
                <td className="text-end">
                  <button className="btn btn-sm btn-outline-primary" onClick={() => onShowDetails(v)}>Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    const keys = Object.keys(first);
    return (
      <table className="table table-hover table-bordered">
        <thead className="table-light">
          <tr>
            {keys.map((k) => <th key={k}>{k}</th>)}
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((row, idx) => (
            <tr key={idx}>
              {keys.map((k) => <td key={k}>{String(row[k])}</td>)}
              <td className="text-end">
                <button className="btn btn-sm btn-primary me-2" onClick={() => onShowDetails(row)}>Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="card mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">{title}</h5>
        <div>
          <small className="text-muted me-3">{endpoint}</small>
          <button className="btn btn-sm btn-outline-secondary me-2" onClick={onRefresh}>Refresh</button>
        </div>
      </div>
      <div className="card-body">
        {renderTable()}
      </div>
    </div>
  );
}
