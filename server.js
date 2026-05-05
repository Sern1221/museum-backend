const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

app.get('/api/exhibit/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('exhibits')
        .select('*')
        .eq('exhibit_id', id)
        .single();
    
    if (error) return res.status(404).json({ error: '展品不存在' });
    res.json(data);
});

app.get('/', (req, res) => {
    res.send('Museum Backend API is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
