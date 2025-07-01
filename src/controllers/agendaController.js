import Agenda from "../models/Agenda.js";

async function getAgenda(req, res) {
  try {
    const agendas = await Agenda.find({ userId: req.userId });
    res.status(200).json(agendas);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao buscar Agendas", error });
  }
}

async function createAgenda(req, res) {
  try {
    console.log('userId:', req.userId);
    console.log('body:', req.body);

    const agendaData = new Agenda ({
      ...req.body,
      userId: req.userId
    });

    const agenda = await Agenda.create(agendaData);
    res.status(201).json(agenda);
  } catch (error) {
    console.error('Erro ao criar agenda:', error);
    res.status(500).json({ msg: "Erro ao criar agenda", error });
  }
}


async function deleteAgenda(req, res) {
  try {
    const { id } = req.params;
    await Agenda.findByIdAndDelete(id);
    return res.status(200).json({ msg: "Agenda deletada com sucesso" });
  } catch (error) {
    console.error('Erro ao deletar agenda:', error);
    return res.status(500).json({ msg: "Erro ao deletar agenda", error });
  }
}

async function putAgenda(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedAgendas = await Agenda.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ msg: "Agenda atualizada", updatedAgendas });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao atualizar agenda", error });
  }
}
export { getAgenda, createAgenda, deleteAgenda, putAgenda };