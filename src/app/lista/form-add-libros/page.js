'use client'
import {useState} from 'react';
export default function AddLibroPage(){
    const emptyForm = {titulo: '', autor: ''};
    const [formData, setFormData] = useState(emptyForm);

    async function addLibro(e){
        e.preventDefault();
        if(!comprobaciones()){
            return;
        }
        
        try {
            const res = await fetch("http://localhost:3000/api/agenda", {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setFormData(emptyForm);
                alert('Libro añadido');
            } else {
                alert(`Error: ${data.error}`);
            }
            
        } catch (error) {
            alert('Error estableciendo la conexión');
        }
    }

    function comprobaciones(){
        let todoGuay = true;
        if(!formData.titulo ){
            alert('Titulo requerido');
            todoGuay = false;
        }else if(!formData.autor){
            alert('Autor requerido');
            todoGuay = false;
        }
        return todoGuay;
    }

    return <div>
        <h1>Añadir libro</h1>
        <main>
            <form onSubmit={(e) => addLibro(e)}>
                <label>Titulo: <input type="text" value={formData.titulo} onChange={(e) => setFormData({...formData, titulo: e.target.value})} required></input></label><br></br>
                <label>Autor: <input type="text" value={formData.autor} onChange={(e) => setFormData({...formData, autor: e.target.value})} required></input></label><br></br>
                <input type='submit' className='submit' value='Añadir libro'></input>
            </form>
        </main>
    </div>
}