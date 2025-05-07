import { useEffect, useState } from 'react';
import { supabase } from '../main';

export default function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const { data, error } = await supabase
        .from('events')
        .select('id, title, date, categories(name)')
        .order('date', { ascending: true });
      if (!error) setEvents(data);
    }
    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Lista de Eventos</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.title}</strong> ({event.date}) - {event.categories?.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
