import { useState } from 'react';
import { supabase } from '../main';

export default function CreateCategory() {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;
    await supabase.from('categories').insert([{ name }]);
    alert('Categoria criada!');
    setName('');
    window.location.reload(); // adicionei para fazer o reload da pagina ao inserir registro, acho que tem forma melhor de fazer isso dando refresh apenas nos dados/lista
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Criar Categoria</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome da categoria"
      />
      <button type="submit">Criar</button>
    </form>
  );
}
