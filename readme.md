# hextended.com

Hyper Extended is a variant Magic format originating in Atlanta, Georgia, USA.

Visit the served website at https://hextended.com for more information.

## Getting Started
Install [Ruby](https://www.ruby-lang.org/en/downloads/) using whatever package manager or download you prefer.

```sh
gem install bundler
bundle install
bundle exec jekyll serve
```

## Card Tags

```
{% card CARD_NAME | set: abc | text: ALT_CARD_NAME %}
# yields <a href="https://scryfall.com/abc/whatever" title="CARD_NAME">ALT_CARD_NAME</a>

{% card Duress | text: Zwang %}
# yields <a href="https://scryfall.com/card/usg/132/duress?utm_source=hextended" title="Duress">Zwang</a>
```

Where only CARD_NAME is required. This attempts to make an case insensitve match on the full card name, which has so far only been awkward with Lim-Dûl's Vault, but maybe I'll throw some character replacement in there to make that easier.
