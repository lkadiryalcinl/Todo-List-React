const RemoveTodo = async (dispatch, todoID, type) => {
    try {
        const response = await fetch(`https://localhost:44389/api/${type}/remove/${todoID}`, {
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

const DeactivateTodo = async (dispatch, todoID, type) => {
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
                    dispatch({ type: "REMOVE_FROM_FAV_DATA", payload: { todoID } }) &&
                    dispatch({ type: "REMOVE_FROM_DATA", payload: { todoID } }) &&

                    await fetch(`https://localhost:44389/api/todo/${todoID}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }) :
                    dispatch({ type: 'REMOVE_FROM_DATA', payload: { todoID } })

        } else {
            console.error('Todo Delete Failed:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Request Failed', error.message);
    }
}

const ActivateUser = async (dispatch, navigate, UserID) => {
    const body = {
        userID: UserID
    }

    try {
        const response = await fetch(`https://localhost:44389/api/auth/activate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        const data = await response.json()
        if (response.ok) {
            dispatch({ type: 'SUCCESS', payload: data.userId })
            navigate('/dashboard')
        } else {
            console.error('User Activate Failed:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Request Failed', error.message);
    }
}

const RemoveUser = async (dispatch, navigate, UserID) => {
    try {
        const response = await fetch(`https://localhost:44389/api/auth/${UserID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const data = await response.json()
        if (response.ok) {
            dispatch({ type: 'LOGOUT' })
            navigate('/')
        } else {
            console.error('User Remove Failed:', response.status, response.statusText);
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
        description: data.description
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

const AddTodo = async (dispatch, data, userID) => {
    let dateStart = new Date(data.date?.dateStart)
    let dateEnd = new Date(data.date?.dateEnd)

    dateStart.setHours(new Date().getHours())
    dateStart.setMinutes(new Date().getMinutes())

    dateEnd.setHours(new Date().getHours())
    dateEnd.setMinutes(new Date().getMinutes())

    const body = {
        userID: userID,
        title: data.title,
        description: data.description,
        priorityType: data.priorityType,
        dateCreated: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)),
        dateStart: data.date ? new Date(dateStart.getTime() - (new Date().getTimezoneOffset() * 60000)) : new Date(data.dateStart),
        dateEnd: data.date ? new Date(dateEnd.getTime() - (new Date().getTimezoneOffset() * 60000)) : new Date(data.dateEnd),
        isFinished: false,
        isFav: false,
        isActive: true
    }

    try {
        const response = await fetch(`https://localhost:44389/api/todo/addTodo`, {
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

const UpdateTodo = async (dispatch, values, data, type) => {
    console.log(type);
    let dateStart = new Date(values.date.dateStart)
    let dateEnd = new Date(values.date.dateEnd)

    dateStart.setHours(new Date(data.dateCreated).getHours())
    dateStart.setMinutes(new Date(data.dateCreated).getMinutes())

    dateEnd.setHours(new Date(data.dateCreated).getHours())
    dateEnd.setMinutes(new Date(data.dateCreated).getMinutes())

    let body = {
        todoId: data.todoID,
        userID: data.userID,
        title: values.title,
        description: values.description,
        priorityType: values.priorityType,
        dateCreated: data.dateCreated,
        dateStart: new Date(dateStart.getTime() - (new Date().getTimezoneOffset() * 60000)),
        dateEnd: new Date(dateEnd.getTime() - (new Date().getTimezoneOffset() * 60000)),
        isFav: data.isFav,
        isFinished: data.isFinished,
        isActive: data.isActive
    }

    try {
        const response = await fetch(`https://localhost:44389/api/${type}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })

        const data = await response.json()
        dispatch({ type: 'REMOVE_FROM_DATA', payload: data })
        data.isFav && dispatch({ type: 'REMOVE_FROM_FAV_DATA', payload: data })

        if (response.ok) {
            if (type === "todo") {
                dispatch({ type: 'ADD_TODO', payload: data })
                data.isFav && dispatch({ type: 'ADD_FAV', payload: data })
            }
            else if (type === "favtodo") {
                dispatch({ type: 'ADD_TODO', payload: data })
                dispatch({ type: 'ADD_FAV', payload: data })
            }
        } else {
            console.error('Todo Add Failed:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Request Failed', error.message);
    }
}

const ToggleFav = async (dispatch, TodoID, type) => {
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
                dispatch({ type: 'REMOVE_FROM_FAV_DATA', payload: data })
                dispatch({ type: 'ADD_TODO', payload: data })
                RemoveTodo(dispatch, data.todoID, "favtodo")
                ToggleFavMS(TodoID)
            }
            else if (type === "todo") {
                dispatch({ type: 'ADD_TODO', payload: data })
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

const ToggleFinished = async (dispatch, TodoID, type) => {

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
            dispatch({ type: 'REMOVE_FROM_DATA', payload: data })
            if (type === "todo") {
                AddTodoMongo(data, "finishedtodo")
                dispatch({ type: 'ADD_FIN', payload: data })
                DeactivateTodo(dispatch, data.todoID, "todo")
                data.isFav && DeactivateTodo(dispatch, data.todoID, "favtodo")
                data.isFav && dispatch({ type: 'REMOVE_FROM_FAV_DATA', payload: data })
            }
            else if (type === "finishedtodo") {
                dispatch({ type: 'REMOVE_FROM_FIN_DATA', payload: data })
                DeactivateTodo(dispatch, data.todoID, "finishedtodo")
                AddTodo(dispatch, data, data.userID)
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
        const response = await fetch(`https://localhost:44389/api/${type}/${TodoID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            return await response.json()
        } else {
            console.error('Todo alınamadı:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('İstek gönderilirken bir hata oluştu:', error.message);
    }
}

const GetUserByID = async (UserID) => {
    try {
        const response = await fetch(`https://localhost:44389/api/auth/${UserID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json()

        if (response.ok) {
            return data;
        } else {
            console.error('Kullanıcı bulunamadı: ', response.status, response.statusText);
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
            const data = await response.json();

            if (data.hasAccess) {
                const user = await GetUserByID(data.userId);
                if (user) {
                    dispatch({ type: "SUCCESS", payload: data.userId });
                    navigate('/dashboard', { state: { userId: data.userId } });
                    return { text: "USER_FOUND", userID: data.userId };

                } else {
                    return { text: "USER_DEACTIVE", userID: data.userId };
                }
            } else {
                return { text: "USER_NOT_FOUND" };
            }
        } else {
            console.error('Kimlik doğrulama başarısız:', response.status, response.statusText);
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
    RemoveUser,
    ActivateUser,
    DeactivateTodo
}