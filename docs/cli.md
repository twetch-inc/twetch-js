# Twetch SDK CLI

## Usage

The quickest way to get started is to run the initialization command from the cli

```bash
twetch init
```

After you have completed the initialization steps you can begin using the cli. To post run the following:

```bash
twetch post --content "Hello World from Twetch SDK"
```

You can see additional commands and usage by running:

```bash
twetch --help
```

## Examples

### Text post

```bash
twetch post --content "Hello World from Twetch SDK"
```

### Text post with mention

```bash
twetch post --content "Hello @1 from Twetch SDK"
```

### Text post with mention and branch 

```bash
twetch post --content "Hello @4552 from Twetch SDK https://twetch.app/t/9ac9118692f2f0004b3de8e9ec3aad1594291135655f579b2c5b85d364edf255"
```

### Reply

```bash
twetch post --content "Hello World from Twetch SDK" --reply 9ac9118692f2f0004b3de8e9ec3aad1594291135655f579b2c5b85d364edf255
```

### Image / Media 

```bash
twetch post --content "Hello World" --file file.png 
```

### Likes

```bash
twetch like -t abda4a05b98a60e9098f0cccebe5948118189d1b161a0372c35fac654eb87e30
```

### Tweet from Twetch

```bash
twetch post --content "Hello Twitter from Twetch" --tweet y
```

### Hide Twetch link from Twitter

```bash
twetch post --content "Hello Twitter from Twetch" --hide y
```
