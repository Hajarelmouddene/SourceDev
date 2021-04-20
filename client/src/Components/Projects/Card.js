import React from "react";

const Card = () => {
  return (
    <Card>
      <CardTitle>
        <div>To do</div>
        <button
          onClick={() => {
            handleAddTask("todo");
          }}
        >
          <BsPlusCircle />
        </button>
      </CardTitle>

      {addTask ? (
        <AddTask>
          <textarea
            placeholder="Describe task to be added"
            onChange={handleInputChange}
            value={inputValue}
          ></textarea>
          <button onClick={handleAppendTask}>add task</button>
        </AddTask>
      ) : (
        <> </>
      )}
      <>
        {project[0].todoTasks.map((task, index) => {
          return (
            <Task>
              {project[0].todoTasks[index]}
              <button onClick={handleTaskMenu}>
                <BiDotsVerticalRounded />
              </button>
            </Task>
          );
        })}
      </>
    </Card>
  );
};

export default Card;
