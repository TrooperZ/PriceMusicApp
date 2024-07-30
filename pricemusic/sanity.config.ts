import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'pricemusic',

  projectId: '86f1a0qf',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
