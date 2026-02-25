import Hero from '@/components/section/home/hero'
import OurSauces from '@/components/section/home/our-sauces'
import OurStory from '@/components/section/home/our-story'
import RecipesCard from '@/components/ui/recipes-card'
import FrontendLayout from '@/layouts/frontend-layout'
import React from 'react'

export default function Home({ listings }: any) {
  return (
    <FrontendLayout activePage="home">
      <Hero />
      <OurSauces />
      <OurStory />
      <RecipesCard />
    </FrontendLayout>
  )
}
