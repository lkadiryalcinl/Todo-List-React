const RemoveTodo = async (dispatch, TodoID) => {
    try {
        const response = await fetch(`https://localhost:44389/api/todo/${TodoID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.ok) {
            dispatch({ type: "REMOVE_TODO", payload: TodoID })
        } else {
            console.error('Todo Delete Failed:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Request Failed', error.message);
    }
}

const AddTodo = async (dispatch, data, userID) => {
    const body = {
        userID: userID,
        title: data.title,
        description: data.desc,
        priorityType: data.priorityType,
        dateCreated: new Date(),
        dateStart: data.date.dateStart,
        dateEnd: data.date.dateEnd,
        isFinished: false,
        isFav: false
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
            dispatch({ type: "ADD_TODO", payload: data })
        } else {
            console.error('Todo Add Failed:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Request Failed', error.message);
    }
}

const UpdateTodo = async () => {

}

const ToggleFav = async (dispatch, TodoID, isFav) => {
    const body = {
        todoID: TodoID,
    };

    try {
        const response = await fetch(`https://localhost:44389/api/todo/favorited`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();

        if (response.ok) {
            !isFav ?
                dispatch({ type: 'ADD_FAV', payload: data }) :
                dispatch({ type: 'REMOVE_FAV', payload: data })
        } else {
            console.error('Toggle Fav Failed:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Request Failed', error.message);
    }
};

const ToggleFinished = async (TodoID) => {
    try {
        await fetch(`https://localhost:44389/api/todo/${TodoID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: TodoID,
        })
    } catch (error) {
        console.error('Request Failed', error.message);
    }
}

const GetTodoByID = async (TodoID) => {
    try {
        const response = await fetch(`https://localhost:44389/api/todo/${TodoID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json()
            return data;
        } else {
            console.error('Auth başarısız:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('İstek gönderilirken bir hata oluştu:', error.message);
    }
}

const HandleAuth = async (navigate, dispatch, loginData,type) => {
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

const FetchData = async (dispatch,userId) => {
    try {
        const response = await fetch(`https://localhost:44389/api/todo?UserId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.ok) {
            const data = await response.json()
            dispatch({ type: "ADD", payload: data })
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
    FetchData
}