import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hiltuhxwiptrgbnerjrp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpbHR1aHh3aXB0cmdibmVyanJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcxMDgzMTUsImV4cCI6MjA1MjY4NDMxNX0.mHcAkPWO7_NDTIbUZ5xWyoeHrfGsUz_fYy6VgIuWTm0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(request) {
  const url = new URL(request.url)
  const filter = url.searchParams.get("filter")
 
  try {
    if(filter == "read"){
        const { data: libros, error } = await supabase.from('libro').select('*').eq('leido', true).order('titulo', { ascending: true });
        if (error) {
            return new Response(
              JSON.stringify({ error: 'Error al obtener los datos', details: error.message }),
              { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
          }
      
          return new Response(JSON.stringify(libros), {
            headers: { 'Content-Type': 'application/json' },
          });
    }else if(filter == "unread"){
        const { data: libros, error } = await supabase.from('libro').select('*').eq('leido', false).order('titulo', { ascending: true });
        if (error) {
            return new Response(
              JSON.stringify({ error: 'Error al obtener los datos', details: error.message }),
              { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
          }
      
          return new Response(JSON.stringify(libros), {
            headers: { 'Content-Type': 'application/json' },
          });
    }else{
        const { data: libros, error } = await supabase.from('libro').select('*').order('titulo', { ascending: true });
        if (error) {
            return new Response(
              JSON.stringify({ error: 'Error al obtener los datos', details: error.message }),
              { status: 500, headers: { 'Content-Type': 'application/json' } }
            );
          }
      
          return new Response(JSON.stringify(libros), {
            headers: { 'Content-Type': 'application/json' },
          });
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor', details: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

function comprobaciones(body){
  if(!body.titulo){
    return new Response(
      JSON.stringify({ error: 'Titulo requerido'}),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
  if(!body.autor){
    return new Response(
      JSON.stringify({ error: 'Autor requerido'}),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
  return body;
}

export async function POST(request) {
  const body = await request.json();
  const res = comprobaciones(body);

  if(res instanceof Response){
    return res;
  }

  try {
    const { data: data, error } = await supabase.from('libro').insert([res]);
    if (error) {
      return new Response(
        JSON.stringify({ error: 'Error al actualizar los datos', details: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor', details: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function PUT(request) {
  const body = await request.json();

  try {
    const { data: data, error } = await supabase.from('libro')
    .update({
      leido: !body.leido
    }).eq('id', body.id);
    
    if (error) {
      return new Response(
        JSON.stringify({ error: 'Error al actualizar los datos', details: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor', details: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function DELETE(request){
    const body = await request.json();
    
    try{
      const {data: data, error} = await supabase.from('libro').delete().eq('id', body.id);

      if (error) {
        return new Response(
          JSON.stringify({ error: 'Error al actualizar los datos', details: error.message }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }

      return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      return new Response(
        JSON.stringify({ error: 'Error interno del servidor', details: err.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
}
