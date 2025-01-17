import { Writable, writable } from 'svelte/store'
import { randomId } from '@/plugins/util'

export type Link = {
  url: string
  id: string
  keywords: string
}

// Deserialize data in LocalStorage. In case of no data, the empty array will be deserialized
export const links: Writable<Link[]> = writable(JSON.parse(localStorage.links || '[]'))

// Prepending newly generated link object
export const addLink = (url: string, keywords: string = '') => {
  links.update((currentLinks) => [
    {
      id: randomId(),
      url,
      keywords,
    }, 
    ...currentLinks
  ])
}

export const deleteLink = (id: string) => {
  links.update((currentLinks) => currentLinks.filter(link => link.id !== id))
}

export const deleteAllLinks = () => {
  links.set([])
}

// Not the most efficient way to change only one link object
export const updateKeywords = (id: string, keywords: string) => {
  links.update((currentLinks) => {
    return currentLinks.map((link) => {
      if (link.id === id) {
        link.keywords = keywords
      }
      
      return link
    })
  })
}

// Save all the links to the LocalStorage, whenever some of the links changes
links.subscribe((allLinks) => {
  localStorage.setItem('links', JSON.stringify(allLinks))
})