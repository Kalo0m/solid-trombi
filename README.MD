# Solid trombi

## Technos ⚡

- 💡 SolidJS / SolidStart
- ⚡️ Vite
- 🛠️ Tailwind
- 📦 Prisma
- 🕶️ Next-auth
- 🤳 Vercel
- 💖 Typescript

## Fonctionalité ⚡

- Connexion avec des providers (Github et Google)
- Connexion avec un magic link
- Mise à jour de nos informations
- Filtrage en fonction des promotions

## Lancer le projet

```sh
npm install # or yarn install / pnpm install
npm run dev # or yarn run dev / pnpm run dev
```

## Pourquoi solidJs à la place de react ?

### React est-il performant ?

quand un composant react se met à jour, on dit qu'il rerender. Lorsqu'une variable se met à jour (via un setState), tout le composant où cette variable est créé se met à jour. Par exemple :

```tsx
const Counter = () => {
  const [counter, setCounter] = useState(0)

  return (
    <>
      <p>{counter}</p>
      <button onClick={() => setCounter((c) => c + 1)}>Add</button> 

      <AutreComposant />
    </>
  )
}
```
Lorqu'on va cliquer sur le boutton, tout le composant counter va rerender ce qui veut dire que AutreComposant va aussi rerender alors qu'il n'a rien à voir avec la variable counter.

C'est le princile problème que solidJs va résoudre. https://www.solidjs.com/

Solidjs se base sur des primitives qui ne dépendent d'aucun framework (on pourrait donc les utiliser en vanilla js ou autre).

Il met à disposition des <b>signals</b> qui vont utiliser des proxies pour se mettre à jour sans rerender le composant. Prenons l'exemple précedent :

```tsx
const Counter = () => {
  const [counter, setCounter] = createSignal(0)

  return (
    <>
      <p>{counter()}</p>
      <button onClick={() => setCounter((c) => c + 1)}>Add</button> 

      <AutreComposant />
    </>
  )
}
```

Dans cet exemple, lorsqu'on cliquera sur le boutton, il n'y aura aucun rerender mais la valeur dans le balise <p> sera mit à jour.

Pour plus d'information sur la réactivité dans les frameworks du moment, vous pouvez aller voir les videos/streams de Ryan Carniato le créateur de solidjs https://www.youtube.com/c/RyanCarniato9 et principalement la vidéo https://www.youtube.com/watch?v=R5AcOtxIdMk qui est très intéressante


