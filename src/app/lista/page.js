'use client';

import {useState, useEffect} from 'react';
import Link from 'next/link'

export default function ListaLecturaPage(){

    const [libros, setLibros] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchData();
    }, [filter])

    async function fetchData() {
        let url = "http://localhost:3000/api/lista"; 

        if(filter !== "all"){
            url = url + "?filter=" + filter
        }
        const res = await fetch(url);
        const data = await res.json();
        setLibros(data);
    }

    async function updateLibro(libro){
        try {
          const res = await fetch("http://localhost:3000/api/lista", {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(libro),
          });
    
          const data = await res.json();
    
          if (res.ok) {
            fetchData();
          } else {
            alert("Error actualizando");
          }
        } catch (error) {
            alert('Error estableciendo la conexión');
        }
    }

    async function deleteLibro(libro){
        const result = window.confirm(`¿Deseas eliminar '${libro.titulo}'?`);
        if (!result) {
          return;
        }
        try {
          const res = await fetch("http://localhost:3000/api/lista", {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: libro.id}),
          });
    
          const data = await res.json();
    
          if (res.ok) {
            fetchData();
          } else {
            alert(`Error: ${data.error}`);
          }
        } catch (error) {
          alert('Error estableciendo la conexión');
        }
       }

    return <div>
        <h1>Lista de lectura</h1>
        <Link style={{ color: "blue" }} href={"/lista/form-add-libros"}>Añade un libro aqui</Link><br></br>
        <input type='radio' name='filtroLibros' defaultChecked value='all' onChange={() => setFilter('all')}/>Todos
        <input type='radio' name='filtroLibros' value='read' onChange={() => setFilter('read')}/>Leidos
        <input type='radio' name='filtroLibros' value='unread' onChange={() => setFilter('unread')}/>No leidos
        <ul>
            {libros.map((libro) =>
                <li key={libro.id}>
                    <p style={{fontWeight: 'bold'}}>
                        <input type='checkbox' checked={libro.leido} onChange={() => updateLibro(libro)}></input>
                        {libro.titulo}
                        <button onClick={() => deleteLibro(libro)}>Eliminar</button>
                        </p>
                    <p>Autor: {libro.autor}</p>
                </li>
            )}
        </ul>
    </div>
}    