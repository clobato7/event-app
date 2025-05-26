import { useEffect, useState } from 'react';
import { supabase } from '../main';

export default function CreateEvent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase.from('categories').select('*');
      setCategories(data);
    }
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await supabase.from('events').insert([{ title, description, date, category_id: categoryId }]);
    alert('Evento criado!');
    setTitle('');
    setDescription('');
    setDate('');
    setCategoryId('');
    window.location.reload(); // adicionei para fazer o reload da pagina ao inserir registro, acho que tem forma melhor de fazer isso dando refresh apenas nos dados/lista
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Criar Evento</h2>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" />
      <br />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição"
      />
      <br />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <br />
      <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
        <option value="">Selecione uma categoria</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <br />
      <button type="submit">Criar Evento</button>
    </form>
  );
}
