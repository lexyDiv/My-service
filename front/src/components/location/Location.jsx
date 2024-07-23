import React from "react";


const Location = function ({ location }) {
  return (
     <>
     <div className="card" style={{maxWidth: '28rem', margin: '10px', padding: '5px'}}>
     <p className="card-title" style={{fontStyle: 'italic'}}>Расположение : </p>
     <p className="card-title">{location.address}</p>
  <img src={location.image} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{location.name}</h5>
    <p className="card-text">{`Всего домов : ${location.Houses.length}`}</p>
    <p className="card-text">{location.description}</p>
    <a href="#" className="btn btn-primary">Подробнее</a>
  </div>
</div>
     </>
  );
};

export default Location;
