import React, { useState } from 'react';
import './bootstrap.css';

function App() {

  const [recipesList, setRecipesList] = useState([]);
  const [recipesName, setRecipesName] = useState("");

  const [recipesMore, setRecipesMore] = useState("");
  const [recipesMoreList, setRecipesMoreList] = useState([]);

  const [num, setNum] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [username, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [numberofservings, setNumberOfServings] = useState("");
  const [calories, setCalories] = useState("");
  const [cookingtime, setCookingTime] = useState("");

  const [id, setID] = useState("");

  const getAllRecipes = async e => {
    e.preventDefault();
    try {
      const res2 = await fetch(`http://localhost:5000/recipesbook/get/all/recipes`);
      setRecipesList(await res2.json());
    } catch (err) {
      console.error(err.message);
    }
  };

  const searchRecipes = async e => {
    e.preventDefault();
    try {
      const res1 = await fetch(`http://localhost:5000/recipesbook/search/recipes/${recipesName}`);
      setRecipesList(await res1.json());
    } catch (err) {
      console.error(err.message);
    }
  };

  const getMoreInfo = async e => {
    e.preventDefault();
    try {
      const res1 = await fetch(`http://localhost:5000/recipesbook/search/recipes/moreinfo/${recipesMore}`);
      setRecipesMoreList(await res1.json());
    } catch (err) {
      console.error(err.message);
    }
  };

  const AddNewRecipe = e => {
    e.preventDefault();
    try {
      const body = { num, name, type, image, username, description, weight, numberofservings, calories, cookingtime };
      if (num.length > 0 && name.length > 0 && type.length > 0 && image.length > 0 && username.length > 0 && description.length > 0 && weight.length > 0 && numberofservings.length > 0 && calories.length > 0 && cookingtime.length > 0) {
        fetch(`http://localhost:5000/recipesbook/add/newrecipes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
        window.location = "/";
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const DeleteRecipes = e => {
    e.preventDefault();
    try {
      fetch(`http://localhost:5000/recipesbook/deleted/recipes/${id}`, {
        method: "DELETE"
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="container p-5 my-5">
      <div className="row">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div class="container-fluid">
            <a class="navbar-brand">Dish book</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>

        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link active" data-bs-toggle="tab" href="#Search">Search dish</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#AddNew">Add new dish</a>
          </li>
        </ul>

        <div class="tab-content">
          <div class="tab-pane fade show active" id="Search">
            <fieldset>
              <h1 class="my-5">Search dish by name or type</h1>
              <form class="d-flex" >
                <input type="text" name="name" placeholder="Enter recipe name or type..." class="form-control me-1 shadow" value={recipesName} onChange={e => setRecipesName(e.target.value)} />
                <button class="btn btn-primary me-1 shadow btn-sm" onClick={searchRecipes}>Search</button>
                <button class="btn btn-primary me-1 shadow btn-sm" onClick={getAllRecipes}>View all recipes</button>
              </form>

              <h2 class="my-5">Dish list</h2>

              <div class="container mx-auto mt-3">
                <div class="row">
                  {recipesList.map(value => (
                    <div class="col-md-4 p-1 my-1 d-flex align-items-stretch">
                      <div class="card shadow" >
                        <img src={value.image} class="card-img-top d-block mx-auto" alt="..." />
                        <div class="card-body d-flex flex-column">
                          <h5 class="card-title">№ {value.num} {value.name}</h5>
                          <ul class="list-group list-group-flush">
                            <li class="list-group-item"><strong>Type of dish: </strong>{value.type}</li>
                            <li class="list-group-item"><strong>Date add: </strong>{value.dateadd}</li>
                          </ul>

                          <form onSubmit={getMoreInfo}>
                            <button className="btn btn-primary my-1 shadow" data-bs-toggle="modal" data-bs-target="#modal" value={value.name} onClick={e => setRecipesMore(e.target.value)}>More</button>
                          </form>

                          <form onSubmit={DeleteRecipes}>
                            <button className="btn btn-danger my-1 shadow" value={value.recipesid} onClick={e => setID(e.target.value)}>Delete</button>
                          </form>

                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </fieldset>

            <div class="modal" id="modal">
              <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                {recipesMoreList.map(value => (
                  <div class="modal-content">
                    <div class="modal-header">
                      <h4 class="modal-title">{value.name}</h4>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"><span aria-hidden="true"></span></button>
                    </div>
                    <div class="modal-body">
                      <img src={value.image} class="card-img-top shadow" alt="..." />
                      <p class="my-2">{value.description}</p>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item"><strong>Тип блюда: </strong>{value.type}</li>
                        <li class="list-group-item"><strong>Вес блюда: </strong>{value.weight}</li>
                        <li class="list-group-item"><strong>Количество каллорий: </strong>{value.calories}</li>
                        <li class="list-group-item"><strong>Количество порций: </strong>{value.numberofservings}</li>
                        <li class="list-group-item"><strong>Время приготовления: </strong>{value.cookingtime}</li>
                        <li class="list-group-item"><strong>Дата добавления: </strong>{value.dateadd}</li>
                        <li class="list-group-item"><strong>Кто добавил: </strong>{value.username}</li>
                      </ul>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div class="tab-pane fade" id="AddNew">
            <fieldset>
              <form onSubmit={AddNewRecipe}>
                <div class="col-md-12">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label mt-4"><strong>Номер блюда: </strong></label>
                        <input class="form-control" placeholder="Введите номер блюда" value={num} onChange={e => setNum(e.target.value)} />
                      </div>

                      <div class="form-group">
                        <label class="form-label mt-4"><strong>Название блюда: </strong></label>
                        <input class="form-control" placeholder="Введите название блюда" value={name} onChange={e => setName(e.target.value)} />
                      </div>

                      <div class="form-group">
                        <label class="form-label mt-4"><strong>Описание: </strong></label>
                        <textarea class="form-control" rows="3" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                      </div>

                      <div class="form-group">
                        <label class="form-label mt-4"><strong>Тип блюда: </strong></label>
                        <input class="form-control" placeholder="Введите тип блюда" value={type} onChange={e => setType(e.target.value)} />
                      </div>

                      <div class="form-group">
                        <label class="form-label mt-4"><strong>Вес: </strong></label>
                        <input class="form-control" placeholder="Введите вес" value={weight} onChange={e => setWeight(e.target.value)} />
                      </div>

                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="form-label mt-4"><strong>Количество порций: </strong></label>
                        <input class="form-control" placeholder="Введите на сколько порций блюдо" value={numberofservings} onChange={e => setNumberOfServings(e.target.value)} />
                      </div>

                      <div class="form-group">
                        <label class="form-label mt-4"><strong>Каллорий: </strong></label>
                        <input class="form-control" placeholder="Введите количество каллорий" value={calories} onChange={e => setCalories(e.target.value)} />
                      </div>

                      <div class="form-group">
                        <label class="form-label mt-4"><strong>Время приготовления: </strong></label>
                        <input class="form-control" placeholder="Введите время приготовления" value={cookingtime} onChange={e => setCookingTime(e.target.value)} />
                      </div>

                      <div class="form-group">
                        <label class="form-label mt-4"><strong>Введита URL ссылку на картинку: </strong></label>
                        <input class="form-control" placeholder="Ссылка на картинку" value={image} onChange={e => setImage(e.target.value)} />
                      </div>

                      <div class="form-group">
                        <label class="form-label mt-4"><strong>Введите имя того кто добавил блюдо: </strong></label>
                        <input class="form-control" placeholder="Введите имя" value={username} onChange={e => setUserName(e.target.value)} />
                      </div>

                      <button className="btn btn-primary my-2 shadow">Add new recipes</button>
                    </div>
                  </div>
                </div>
              </form>
            </fieldset>
          </div>
        </div>


      </div>
    </div>

  );
}

export default App;
