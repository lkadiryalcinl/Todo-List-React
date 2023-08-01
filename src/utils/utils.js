const RemoveTodo = async (dispatch, todoID, type) => {
    try {
        const response = await fetch(`https://localhost:44389/api/${type}/${todoID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.ok) {
            type === "finishedtodo" ?
                dispatch({ type: "REMOVE_FROM_FIN_DATA", payload: { todoID } }) :
                type === "favtodo" ?
                    dispatch({ type: "REMOVE_FROM_FAV_DATA", payload: { todoID } }) :
                    dispatch({ type: "REMOVE_FROM_DATA", payload: { todoID } })
        } else {
            console.error('Todo Delete Failed:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Request Failed', error.message);
    }
}

const AddTodoMongo = async (data, type) => {
    let dateStart = new Date(data.dateStart)
    let dateEnd = new Date(data.dateEnd)

    const body = {
        ...data,
        dateStart: new Date(dateStart.getTime() - (new Date().getTimezoneOffset() * 60000)),
        dateEnd: new Date(dateEnd.getTime() - (new Date().getTimezoneOffset() * 60000)),
    }
    try {
        const response = await fetch(`https://localhost:44389/api/${type}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        if (response.ok) {

        } else {
            console.error('Todo Add Failed:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Request Failed', error.message);
    }
}

const AddTodo = async (dispatch, data, userID, type) => {
    let dateStart = new Date(data.date?.dateStart)
    let dateEnd = new Date(data.date?.dateEnd)

    const body = {
        userID: userID,
        title: data.title,
        description: data.desc,
        priorityType: data.priorityType,
        dateCreated: new Date(),
        dateStart: data.date ? new Date(dateStart.getTime() - (new Date().getTimezoneOffset() * 60000)) : new Date(data.dateStart),
        dateEnd: data.date ? new Date(dateEnd.getTime() - (new Date().getTimezoneOffset() * 60000)) : new Date(data.dateEnd),
        isFinished: false,
        isFav: false
    }

    try {
        const response = await fetch(`https://localhost:44389/api/${type}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })

        const data = await response.json()
        if (response.ok) {
            dispatch({ type: 'ADD_TODO', payload: data })

        } else {
            console.error('Todo Add Failed:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Request Failed', error.message);
    }
}

const UpdateTodo = async () => {

}

const ToggleFav = async (dispatch, TodoID, type) => {
    console.log(type);
    const body = {
        todoID: TodoID
    }

    try {
        const response = await fetch(`https://localhost:44389/api/${type}/favorited`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (response.ok) {
            dispatch({ type: 'REMOVE_FROM_DATA', payload: data })
            if (type === "favtodo") {
                dispatch({ type: 'REMOVE_FAV', payload: data })
                RemoveTodo(dispatch, TodoID, "favtodo")
                ToggleFavMS(TodoID)
            }
            else if (type === "todo") {
                dispatch({ type: 'ADD_FAV', payload: data })
                AddTodoMongo(data, "favtodo")
            }
        } else {
            console.error('Toggle Fav Failed:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Request Failed', error.message);
    }
};

const ToggleFavMS = async (TodoID) => {
    const body = {
        todoID: TodoID
    }

    try {
        await fetch(`https://localhost:44389/api/todo/favorited`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

    } catch (error) {
        console.error('Request Failed', error.message);
    }
}

const ToggleFinished = async (dispatch, TodoID, isFinished, type) => {
    const body = {
        todoID: TodoID,
    };

    try {
        const response = await fetch(`https://localhost:44389/api/${type}/finished`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const data = await response.json()

        if (response.ok) {
            if (type === "todo") {
                dispatch({ type: 'ADD_FIN', payload: data })
                RemoveTodo(dispatch, data.todoID, "todo")
                AddTodoMongo(data, "finishedtodo")
            }
            else if (type === "finishedtodo") {
                dispatch({ type: 'REMOVE_FIN', payload: data })
                RemoveTodo(dispatch, data.todoID, "finishedtodo")
                AddTodo(dispatch, data, data.userID, "todo/addTodo")
            }
        } else {
            console.error('Toggle Fav Failed:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Request Failed', error.message);
    }
}

const GetTodoByID = async (TodoID, type) => {
    try {
        const response = await fetch(`https://localhost:44389/api/${type}${TodoID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json()
            console.log(data);
            return data;
        } else {
            console.error('Auth başarısız:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('İstek gönderilirken bir hata oluştu:', error.message);
    }
}

const HandleAuth = async (navigate, dispatch, loginData, type) => {
    try {
        const response = await fetch(`https://localhost:44389/api/auth/${type}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        if (response.ok) {
            const data = await response.json()

            if (data.hasAccess) {
                dispatch({ type: "SUCCESS", payload: data.userId })
                navigate('/home', { state: { userId: data.userId } })
                return false
            }
            return true
        } else {
            console.error('Auth başarısız:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('İstek gönderilirken bir hata oluştu:', error.message);
    }
};

const FetchData = async (dispatch, userId, type) => {
    try {
        const response = await fetch(`https://localhost:44389/api/${type}${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.ok) {
            const data = await response.json()
            type === "todo?UserId=" ?
                dispatch({ type: "ADD_DATA", payload: data }) :
                type === "favtodo/elements/" ?
                    dispatch({ type: "ADD_FAV_DATA", payload: data }) :
                    dispatch({ type: "ADD_FINISHED_DATA", payload: data })
        } else {
            console.error('Todo Fetch Failed:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Request Failed', error.message);
    }
}

export {
    RemoveTodo,
    AddTodo,
    UpdateTodo,
    ToggleFav,
    HandleAuth,
    GetTodoByID,
    ToggleFinished,
    FetchData,
}