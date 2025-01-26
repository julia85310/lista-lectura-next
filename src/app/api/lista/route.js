'use client';

import {useState, useEffect} from 'react';
import Link from 'next/link'

export default function ListaLecturaPage(){

    const [libros, setLibros] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        const res = await fetch('http://localhost:3000/api/lista');
        const data = await res.json();
        setLibros(data);
    }

    return <div>
        <h1>Lista de lectura</h1>
        <Link style={{ color: "blue" }} href={"/lista/form-add-libro"}>Añade un libro aqui</Link>
        <ul>
            {libros.map((libro) =>
                <li key={libro.id}>
                    <p style={{fontWeight: 'bold'}}>
                        <input type='checkbox' checked={libro.leido} onChange={() => updateLibro(libro)}></input>
                        {libro.titulo}
                        </p>
                    <p>Autor: {libro.autor}</p>
                </li>
            )}
        </ul>
    </div>
}