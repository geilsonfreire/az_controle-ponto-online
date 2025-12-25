const API_URL = 'https://api.zerosheets.com/v1/b7e';
const FUNCIONARIOS_API_URL = 'https://api.zerosheets.com/v1/kke';
const FUNCIONARIOS_TOKEN = import.meta.env.VITE_ZEROSHEETS_FUNCIONARIOS_TOKEN;
const API_TOKEN = import.meta.env.VITE_ZEROSHEETS_TOKEN;
const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;


// 🔍 Buscar funcionários
export const buscarFuncionarios = async () => {
    try {
        console.log('➡️ Buscando funcionários...');

        const response = await fetch(FUNCIONARIOS_API_URL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${FUNCIONARIOS_TOKEN}`,
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Erro GET Funcionários:', errorText);
            throw new Error('Erro ao buscar funcionários');
        }

        const data = await response.json();
        console.log('✅ Funcionários recebidos:', data);

        return data;
    } catch (error) {
        console.error('🔥 Erro ao buscar funcionários:', error);
        throw error;
    }
};

 // 🔍 Buscar registros de ponto
export const buscarRegistrosPonto = async () => {
    try {
        console.log('➡️ Buscando registros no ZeroSheets...');

        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                Accept: 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Erro HTTP GET:', errorText);
            throw new Error('Erro ao buscar registros');
        }

        const data = await response.json();
        console.log('✅ Dados recebidos:', data);

        // ZeroSheets retorna array com _lineNumber
        return data;
    } catch (error) {
        console.error('🔥 Erro no GET:', error);
        throw error;
    }
};

// Função para enviar o payload ao backend
export const enviarRegistroPonto = async (payload) => {
    try {
        console.log('➡️ Enviando payload:', payload);

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Erro HTTP:', errorText);
            throw new Error('Erro ao enviar registro');
        }

        const data = await response.json();
        console.log('✅ Resposta do backend:', data);

        return data;
    } catch (error) {
        console.error('🔥 Erro no envio:', error);
        throw error;
    }
};

// ✏️ Atualizar registro de ponto (PATCH)
export const atualizarRegistroPonto = async (lineNumber, payload) => {
    try {
        console.log(`➡️ Atualizando registro linha ${lineNumber}:`, payload);

        const response = await fetch(`${API_URL}/${lineNumber}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Erro HTTP PATCH:', errorText);
            throw new Error('Erro ao atualizar registro');
        }

        const data = await response.json();
        console.log('✅ Registro atualizado:', data);

        return data;
    } catch (error) {
        console.error('🔥 Erro no PATCH:', error);
        throw error;
    }
};


// 📤 Upload imagem para ImgBB
export const uploadImagemImgBB = async (base64Image) => {
    try {
        // Remove prefixo: data:image/jpeg;base64,
        const imageBase64 = base64Image.split(',')[1];

        const formData = new FormData();
        formData.append('image', imageBase64);

        const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
            {
                method: 'POST',
                body: formData,
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Erro ImgBB:', errorText);
            throw new Error('Erro ao enviar imagem');
        }

        const data = await response.json();

        return data.data.url;

    } catch (error) {
        console.error('🔥 Erro upload ImgBB:', error);
        throw error;
    }
};
