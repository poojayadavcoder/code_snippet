import Snippet from "../models/snippetModel.js"

const createSnippet = async (req, res) => {
  try {
    const savedSnippet = await Snippet.create(req.body);
    res.status(201).json(savedSnippet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Snippets=async (req,res)=>{
    try{
        const data=await Snippet.find()
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message })
    }
}

const snippetsById=async (req,res)=>{
    try{
        const snippet=await Snippet.findById(req.params.id)
        if(!snippet){
            return res.status(404).json({ message: "Snippet not found" }); 
        }
        res.json(snippet)
    }
    catch(error){
        res.status(500).json({message: error.message })
    }
}

const deleteSnippet=async (req,res)=>{
    try{
        const snippet = await Snippet.findById(req.params.id);
        if (!snippet) {
          return res.status(404).json({ message: "Snippet not found" });
        }
        await Snippet.findByIdAndDelete(req.params.id);

         res.status(200).json({ message: "Snippet deleted successfully" });
    }
    catch(error){
        res.status(500).json({message: error.message })
    }
}

const updateSnippet=async (req,res)=>{
    try{
        const snippet = await Snippet.findById(req.params.id);
        if (!snippet) {
          return res.status(404).json({ message: "Snippet not found" });
        }
         const updatedSnippet = await Snippet.findByIdAndUpdate(
           req.params.id,
           req.body,
           { new: true }
           );

         res.status(200).json(updatedSnippet);
    }
    catch(error){
        res.status(500).json({message: error.message })
    }
}


const snippetsByTag=async (req,res)=>{
    try{
    const snippets=await Snippet.find({tags:req.params.tag})
     if (snippets.length === 0) {
      return res.status(404).json({ message: "No snippets found for this tag" });
    }
      res.status(200).json(snippets);
  
}
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const snippetByLanguage =async (req,res)=>{
    try{
    const snippets=await Snippet.find({language:req.params.language})
     if (snippets.length === 0) {
      return res.status(404).json({ message: "No snippets found for this language" });
    }
      res.status(200).json(snippets);
}
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export { createSnippet, Snippets,deleteSnippet,updateSnippet,snippetsById,snippetsByTag,snippetByLanguage }