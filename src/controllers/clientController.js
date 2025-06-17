import Client from "../models/Client.js";

async function getClients(req, res) {
  try {
    const clients = await Client.find({ userId: req.userId });
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao buscar clientes", error });
  }
}

async function createClient(req, res) {
  try {
    console.log('userId:', req.userId);
    console.log('body:', req.body);

    const clientData = new Client ({
      ...req.body,
      userId: req.userId
    });

    const client = await Client.create(clientData);
    res.status(201).json(client);
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    res.status(500).json({ msg: "Erro ao criar contato", error });
  }
}


async function deleteClient(req, res) {
  try {
    const { id } = req.params;
    await Client.findByIdAndDelete(id);
    res.status(200).json({ msg: "Contato do cliente deletado" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao deletar cliente", error });
  }
}

async function putClient(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedClients = await Client.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ msg: "Contato do cliente atualizado", updatedClients });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao atualizar contato", error });
  }
}
export { getClients, createClient, deleteClient, putClient };