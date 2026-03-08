import BbqSauceRecipes from '@/components/section/home/bbq-sauce-recipes'
import Hero from '@/components/section/home/hero'
import OurSauces from '@/components/section/home/our-sauces'
import OurStory from '@/components/section/home/our-story'
import Testimonial from '@/components/section/home/testimonial'
import FrontendLayout from '@/layouts/frontend-layout'
import { usePage } from '@inertiajs/react'

export default function Home() {
  const { props } = usePage<{ products?: any }>()

  return (
    <FrontendLayout activePage="home">
      <Hero />
      <OurSauces products={props.products} />
      <OurStory />
      <BbqSauceRecipes />
      <Testimonial />
    </FrontendLayout>
  )
}
