import Service from "../models/Service.js";

async function getService(req, res) {
  try {
    const services = await Service.find({ userId: req.userId });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao buscar serviços", error });
  }
}

async function createService(req, res) {
  try {
    const serviceData = {
      ...req.body,
      userId: req.userId
    };

    const service = await Service.create(serviceData);
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao criar serviço", error });
  }
}


async function deleteService(req, res) {
  try {
    const { id } = req.params;
    await Service.findByIdAndDelete(id);
    res.status(200).json({ msg: "Serviço deletado" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao deletar serviço", error });
  }
}

async function putService(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;
    await Service.findByIdAndUpdate(id, updateData);
    res.status(200).json({ msg: "Serviço atualizado" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao atualizar serviço", error });
  }
}

export { getService, createService, deleteService, putService };