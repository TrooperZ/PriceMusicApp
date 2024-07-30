export default {
    name: 'site',
    title: 'site',
    type: 'document',
    fields: [
      {
        name: "title",
        title: "title",
        type: "string",
      },
      {
        name: "description",
        title: "description",
        type: "string",
      },   
      {
        name: "moods",
        title: "moods",
        type: "array",
        of: [{type: "mood"}]
      },
  
    ],
  
  }
  