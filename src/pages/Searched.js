import React from 'react'
import styled from 'styled-components';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';

export default function Searched() {
  const [searched, setSearched] = useState([])
  let params = useParams();

  const getSearched = async (name) => {
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${`172d7aab3bad44558de8286c3c70c57c`}&query=${name}`);
    const recipes = await data.json();
    setSearched(recipes.results);
  };

  useEffect(() => {
    getSearched(params.search);
  }, [params.search])

  return (
    <Grid>
      {searched.map((item) => {
        return (
          <Card key={item.id}>
            <img src={item.image} alt={item.title} />
            <h4>{ item.title} </h4>
          </Card>
        )
      })}
    </Grid>
  )
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`

const Card = styled.div`
  img{
    width: 100%;
    border-radius: 2rem;
  }
  h4 {
    text-align:  center;
    padding: 1rem;
  }
`