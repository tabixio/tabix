# Changelog

> **Tags:**
>
> - [New Feature]
> - [Bug Fix]
> - [Breaking Change]
> - [Documentation]
> - [Internal]
> - [Polish]
> - [Experimental]

**Note**: Gaps between patch versions are faulty/broken releases. **Note**: A feature tagged as Experimental is in a
high state of flux, you're at risk of it changing without notice.

# 0.3.5

- **Polish**
  - better `Equals`, closes #39 (thanks @aleclarson)

# 0.3.4

- **Polish**
  - handle empty object and primitives in `RequiredKeys` and `OptionalKeys` (@ajafff)

# 0.3.3

- **New Feature**
  - add `RequiredKeys` and `OptionalKeys` types, #33 (@saitonakamura)
- **Bug Fix**
  - KeysOfType now handles optional keys, fix #34 (@gcanti)

# 0.3.2

- **Bug Fix**
  - use `never` instead of `undefined` in `Exact` definition, fix #31 (thanks @leighman)

# 0.3.1

- **New Feature**
  - add `KeysOfType` (@mattiamanzati)
  - add `TaggedUnionMember` (@gcanti)

# 0.3.0

- **Breaking Change**
  - upgrade to `typescript@2.9.x` (@gcanti)

# 0.2.4

- **Internal**
  - support `typescript@2.8.3` (@gcanti)

# 0.2.3

- **New Feature**
  - add `HListConcat`, closes #17 (@tvald)

# 0.2.2

- **New Feature**
  - add `Required`, `Purify`, `NonNullable`, closes #15 (@gcanti)

# 0.2.1

- **New Feature**
  - add `ObjectOptional`, closes #13 (@thepheer)

# 0.2.0

- **Breaking Change**
  - complete refactoring
  - upgrade to TypeScript 2.5.2 (@gcanti)

# 0.1.3

- **New Feature**
  - `NumberToNat`
  - `NatToNumber`
  - hlists
  - tuples
  - convert tuples to / from hlists (`TupleToTHList`, `THListToTuple`)

# 0.1.2

- **Bug Fix**
  - remove `ObjectExact` (@gcanti)

# 0.1.1

- **New Feature**
  - `PickExact` (@gcanti)
