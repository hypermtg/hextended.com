require "jekyll"
require "json"

class CardTag < Liquid::Tag

    def initialize(tag_name, content, tokens)
        super
        @content = content
    end

    def render(context)
        card_name = "#{context[@content.strip]}"
        card_url = ""
        link_text = "#{card_name}"

        cards_path = File.join Dir.pwd, "_plugins", "scryfall-filtered-cards.json"
        if File.exist?(cards_path)
            cards = File.read cards_path
            parsed = JSON.parse(cards)

            card = parsed.select {|c| c['name'].casecmp?(card_name)}.first

            if (!card.nil?)
                card_uri = URI.parse(card['scryfall_uri'])
                query_params = URI.decode_www_form('') << ["utm_source", "hextended"]
                card_uri.query = URI.encode_www_form(query_params)

                card_name = card['name']
                card_url = card_uri.to_s
            else
                puts "Failed to find #{card_name}"
            end
        end

        %Q{<a href="#{card_url}">#{ link_text }</a>}
    end

    Liquid::Template.register_tag "card", self
end
