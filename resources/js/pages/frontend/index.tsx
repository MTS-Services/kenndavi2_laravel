import BbqSauceRecipes from '@/components/section/home/bbq-sauce-recipes'
import Hero from '@/components/section/home/hero'
import OurSauces from '@/components/section/home/our-sauces'
import OurStory from '@/components/section/home/our-story'
import Testimonial from '@/components/section/home/testimonial'
import RecipesCard from '@/components/ui/recipes-card'
import FrontendLayout from '@/layouts/frontend-layout'
import React from 'react'

export default function Home({ listings }: any) {
  return (
    <FrontendLayout activePage="home">
      <Hero />
      <OurSauces />
      <OurStory />
      <BbqSauceRecipes />
      <Testimonial />
    </FrontendLayout>
  )
}
