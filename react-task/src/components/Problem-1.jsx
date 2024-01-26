import React, { useState } from 'react';

const Problem1 = () => {
  const [tasks, setTasks] = useState([]);
  const [show, setShow] = useState('all');

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const status = e.target.elements.status.value;
    const newTask = { name, status };
    setTasks([...tasks, newTask]);
  };

  const handleShow = (val) => {
    setShow(val);
  };

  const filteredTasks = () => {
    switch (show) {
      case 'active':
        return tasks.filter((task) => task.status.toLowerCase() === 'active');
      case 'completed':
        return tasks.filter((task) => task.status.toLowerCase() === 'completed');
      default:
        return tasks.sort((a, b) => {
          const order = { active: 1, completed: 2 };
          return (order[a.status.toLowerCase()] || 3) - (order[b.status.toLowerCase()] || 3);
        });
    }
  };
  

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={handleSubmit}
          >
            <div className="col-auto">
              <input type="text" className="form-control" name="name" placeholder="Name" />
            </div>
            <div className="col-auto">
              <input type="text" className="form-control" name="status" placeholder="Status" />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === 'all' && 'active'}`}
                type="button"
                onClick={() => handleShow('all')}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === 'active' && 'active'}`}
                type="button"
                onClick={() => handleShow('active')}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === 'completed' && 'active'}`}
                type="button"
                onClick={() => handleShow('completed')}
              >
                Completed
              </button>
            </li>
          </ul>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks().map((task, index) => (
                <tr key={index}>
                  <td>{task.name}</td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
